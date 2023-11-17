<?php

namespace App\Controller;

use LogicException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class SecurityController extends AbstractController
{
    #[Route('/login', name: 'app_login', methods: ['POST'])]
    public function login(AuthenticationUtils $authenticationUtils): JsonResponse
    {
        //on vérifie que l'utilisateur n'est pas déjà en session
        if ($this->getUser()) {
            return new JsonResponse([
                'success' => true,
                'id' => $this->getUser()->getId(),
                'nickname' => $this->getUser()->getNickname(),
                'email' => $this->getUser()->getEmail(),
                'message' => 'Utilisateur déjà en session'
            ]);
        }

        $error = $authenticationUtils->getLastAuthenticationError();
        $lastUsername = $authenticationUtils->getLastUsername();

        return new JsonResponse([
            'success' => true,
            'id' => $this->getUser()->getId(),
            'nickname' => $this->getUser()->getNickname(),
            'email' => $this->getUser()->getEmail(),
            'last_username' => $lastUsername,
            'error' => $error?->getMessage(),
            'message' => 'Connexion réussie'
        ]);
    }

    #[Route('/logout', name: 'app_logout')]
    public function logout(): void
    {
       throw new LogicException('This method can be blank - it will be intercepted by the logout key on your firewall.');
    }
}
