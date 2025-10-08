<?php

namespace App\Controller\Api;

use App\Repository\AdminRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class AdminController extends AbstractController
{
#[Route('/api/admin', name: 'app_api_admin', methods: ['POST'])]
public function login(AdminRepository $adminRepo, Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
 {
        try {
            $data = json_decode($request->getContent(), true);

            $nom = $data['nom'] ?? null;
            $email = $data['email'] ?? null;
            $password = $data['password'] ?? null;

            if (!$nom || !$email || !$password) {
                return new JsonResponse(['message' => 'Veuillez remplir tous les champs'], 400);
            }

            $admin = $adminRepo->findOneBy(['email' => $email, 'nom' => $nom]);
            if (!$admin || !$passwordHasher->isPasswordValid($admin, $password)) {
                return new JsonResponse(['message' => 'Nom, email ou mot de passe incorrect'], 401);
            }

            return new JsonResponse([
                'nom' => $admin->getNom(),
                'email' => $admin->getEmail()
            ], 200);

        } catch (\Throwable $e) {
            return new JsonResponse([
                'message' => 'Erreur interne',
                'error' => $e->getMessage()
            ], 500);
        }

    }
}



