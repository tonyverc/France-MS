<?php

namespace App\Controller\Api;

use App\Entity\Message;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class MessageController extends AbstractController
{
    // route vers l'API pour poster les donnéees soumise du formulaire
    #[Route('/api/message', name: 'api_message_', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $message = new Message();
        $message->setNom($data['nom'] ?? '');
        $message->setEmail($data['email'] ?? '');
        $message->setTelephone($data['telephone'] ?? null);
        $message->setContenu($data['contenu'] ?? '');
        $message->setDateEnvoi(new \DateTime());

        $em->persist($message);
        $em->flush();
        return new JsonResponse([
            'success' => true,
            'message' => '✅ Message envoyé avec succès !',

        ]);
    }

    // route vers l'API pour recuperer la liste des messages
    #[Route('/api/message', name: 'api_message_list', methods: ['GET'])]
    public function list(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $messages = $em->getRepository(Message::class)->findAll();
        $data = [];
        foreach ($messages as $message) {
            $data[] = [
                'id' => $message->getId(),
                'nom' => $message->getNom(),
                'email' => $message->getEmail(),
                'telephone' => $message->getTelephone(),
                'contenu' => $message->getContenu(),
                'date_envoi' => $message->getDateEnvoi(),
            ];
        }
        return new JsonResponse($data);
    }
}
