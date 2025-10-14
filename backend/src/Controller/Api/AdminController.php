<?php

namespace App\Controller\Api;

use App\Repository\AdminRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class AdminController extends AbstractController
{
    //  NOUVELLE ROUTE - Ne sera pas interceptée par JWT
    #[Route('/api/admin/custom-login', name: 'api_admin_custom_login', methods: ['POST'])]
    public function customLogin(
        AdminRepository $adminRepo,
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {

        $data = json_decode($request->getContent(), true);

        $nom = $data['nom'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$nom || !$email || !$password) {
            return new JsonResponse(['message' => 'Veuillez remplir tous les champs'], 400);
        }

        $admin = $adminRepo->findOneBy(['email' => $email, 'nom' => $nom]);
        if (!$admin) {
            return new JsonResponse(['message' => 'Aucun administrateur trouvé'], 401);
        }

        if (!$passwordHasher->isPasswordValid($admin, $password)) {
            return new JsonResponse(['message' => 'Mot de passe incorrect'], 401);
        }

        $token = $jwtManager->create($admin);

        // ✅ Retour explicite avec TOUTES les données
        return new JsonResponse([
            'id' => $admin->getId(),
            'nom' => $admin->getNom(),
            'email' => $admin->getEmail(),
            'roles' => $admin->getRoles(),
            'token' => $token
        ], Response::HTTP_OK);
    }

    #[Route('/api/admin/login', name: 'api_admin_login', methods: ['POST'])]
    public function login(
        AdminRepository $adminRepo,
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        // ... ton code existant
        $data = json_decode($request->getContent(), true);
        $nom = $data['nom'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$nom || !$email || !$password) {
            return new JsonResponse(['message' => 'Veuillez remplir tous les champs'], 400);
        }

        $admin = $adminRepo->findOneBy(['email' => $email, 'nom' => $nom]);
        if (!$admin) {
            return new JsonResponse(['message' => 'Aucun administrateur trouvé'], 401);
        }

        if (!$passwordHasher->isPasswordValid($admin, $password)) {
            return new JsonResponse(['message' => 'Mot de passe incorrect'], 401);
        }

        $token = $jwtManager->create($admin);

        return new JsonResponse([
            'id' => $admin->getId(),
            'nom' => $admin->getNom(),
            'email' => $admin->getEmail(),
            'roles' => $admin->getRoles(),
            'token' => $token
        ]);
    }
}