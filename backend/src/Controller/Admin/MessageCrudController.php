<?php

namespace App\Controller\Admin;

use App\Entity\Message;
use EasyCorp\Bundle\EasyAdminBundle\Config\Actions;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class MessageCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Message::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('nom'),
            TextField::new('email'),
            TextField::new('telephone'),
            TextField::new('contenu'),
            DateField::new('date_envoi'),
        ];
    }

    // Fonction qui permet de désactiver les actions "new" et "edit" dans l'interface d'administration pour l'entité Message
    public function configureActions(Actions $actions): Actions
    {
        return $actions
            ->disable('new', 'edit');
    }
}
