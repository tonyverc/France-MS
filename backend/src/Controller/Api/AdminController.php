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
    public function login(AdminRepository $adminRepo, Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse{

        $data = json_decode($request ->getContent(), true);
        $nom = $data['nom'];
        $email = $data['email'];
        $password = $data['password'];

        if(!$nom || !$email || !$password){
            return new JsonResponse(['message' => 'Veuillez remplir tous les champs'], Response::HTTP_BAD_REQUEST);
        }

        return new JsonResponse(['message' => 'Admin connecté'], Response::HTTP_OK);

        $admin =$adminRepo->findOneBy(['email' => $email]);
        if (!$admin || !$this->$passwordHasher->isPasswordValid($admin, $password)) {
            return new JsonResponse(['message' => 'Nom d\'utilisateur ou mot de passe incorrect'], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse (['nom' => $admin->getNom(), 'email' => $admin->getEmail()], Response::HTTP_OK);
    }




}
