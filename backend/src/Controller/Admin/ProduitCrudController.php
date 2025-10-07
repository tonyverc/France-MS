<?php

namespace App\Controller\Admin;

use App\Entity\Produit;
use App\Entity\SousCategorie;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;

class ProduitCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Produit::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('nom', 'Nom du produit'),

            TextEditorField::new('description', 'Description'),

            imageField::new('fiche_technique', 'Fiche technique')
                ->setUploadDir('public/uploads/fiches_techniques')
                ->setBasePath('/uploads/fiches_techniques')
                ->setRequired(false),

            ImageField::new('image', 'Image')
                ->setUploadDir('public/uploads/images')
                ->setBasePath('/uploads/images')
                ->setRequired(false),

            AssociationField::new('sous_categorie', 'Sous-catégories')
                ->setFormTypeOptions([
                    'by_reference' => false,
                    'multiple' => true
                ])
                ->setCrudController(SousCategorie::class),
        ];
    }
}
