<?php

namespace App\Controller\Admin;

use App\Entity\SousCategorie;
use Dom\Text;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class SousCategorieCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return SousCategorie::class;
    }

    public function configureFields(string $pageName): iterable
    {
        // permet de configurer les champs affichés dans l'interface d'administration pour l'entité SousCategorie et d'ajouter une categorie parente
        return [
            yield TextField::new('nom', 'Nom de la sous-catégorie'),
            yield AssociationField::new('categorie', 'Catégorie parente')
                ->setFormTypeOptions([
                    'by_reference' => true,
                    'multiple' => false
                ]),
        ];
    }
}
