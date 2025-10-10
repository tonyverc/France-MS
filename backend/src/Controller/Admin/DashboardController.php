<?php

namespace App\Controller\Admin;

use App\Entity\Admin;
use App\Entity\Categorie;
use App\Entity\Message;
use App\Entity\Produit;
use App\Entity\SousCategorie;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\HttpFoundation\Response;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function index(): Response
    {
        $admin = $this->getUser(); // Récupère l'utilisateur actuellement connecté
        // if (!$admin) {
        //     throw $this->createAccessDeniedException('Vous devez être connecté pour accéder à cette page.');
        // }

        $nom = $admin ? $admin->getNom() : 'Admin'; // Récupère le nom de l'utilisateur ou utilise 'Admin' par défaut
        $email = $admin ? $admin->getEmail() : 'Admin'; // Récupère l'email de l'utilisateur ou utilise 'Admin' par défaut

        return $this->render('api/admin/dashboard.html.twig', [
            'nom' => $nom,
            'email' => $email,
        ]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setFaviconPath('admin, fa-thin fa-user')
            ->setTitle('Espace Administration France Marine Services')
            ->renderContentMaximized()
            ->setTranslationDomain('admin');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Accueil', 'fa fa-home');
        yield MenuItem::linkToCrud('Produits', 'fas fa-list', Produit::class);
        yield MenuItem::linkToCrud('Catégories', 'fa-solid fa-table-list', Categorie::class);
        yield MenuItem::linkToCrud('Sous-catégories', 'fas fa-list', SousCategorie::class);
        yield MenuItem::linkToCrud('message', 'fa-regular fa-envelope', Message::class);
        yield MenuItem::linkToUrl('Retour au site', 'fa fa-undo', 'http://localhost:4200/');

        // yield MenuItem::linkToLogout('Déconnexion', 'fa fa-sign-out-alt');
    }
}
