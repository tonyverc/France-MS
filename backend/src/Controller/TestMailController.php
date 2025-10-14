<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

final class TestMailController extends AbstractController
{
    #[Route('/test/mail', name: 'app_test_mail')]
    public function testMail(MailerInterface $mailer): JsonResponse
    {
         $email = (new Email())
            ->from('no-reply@example.com')
            ->to('admin@example.com')
            ->subject('Test Mail')
            ->text('Ceci est un test de Symfony vers Mailhog.');

        try {
            $mailer->send($email);
            return new JsonResponse(['success' => true, 'message' => 'Mail envoyé !']);
        } catch (\Exception $e) {
            return new JsonResponse(['success' => false, 'error' => $e->getMessage()]);
        }
    }
    
}

