<?php

namespace App\Controller\Admin;

use App\Entity\Produit;
use App\Entity\SousCategorie;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextEditorField;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\File\UploadedFile;


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

            TextField::new('fiche_technique', 'Fiche technique (PDF)')
                ->setFormType(FileType::class)
                ->setFormTypeOptions([
                    'mapped' => false,     // le champ n'est pas directement lié à l'entité
                    'required' => false,
                    'data_class' => null, // Important pour les fichiers
                    'constraints' => [
                        new \Symfony\Component\Validator\Constraints\File([
                            'maxSize' => '10M',
                            'mimeTypes' => ['application/pdf'],
                            'mimeTypesMessage' => 'Veuillez uploader un fichier PDF valide',
                        ])
                    ],
                ])
                ->onlyOnForms(),


            ImageField::new('image', 'Image')
                ->setUploadDir('public/uploads/images')
                ->setBasePath('/uploads/images')
                ->setRequired(false)
                ->setFormTypeOptions([
                    'required' => false,
                    
                ]),

            AssociationField::new('sous_categorie', 'Sous-catégories')
                ->setFormTypeOptions([
                    'by_reference' => false,
                    'multiple' => true
                ])
                ->setCrudController(SousCategorie::class),
        ];
    }

     public function persistEntity(EntityManagerInterface $em, $entityInstance): void
    {
        $this->handleFicheTechniqueUpload($entityInstance);
        parent::persistEntity($em, $entityInstance);
    }

    public function updateEntity(EntityManagerInterface $em, $entityInstance): void
    {
        $this->handleFicheTechniqueUpload($entityInstance);
        parent::updateEntity($em, $entityInstance);
    }

    private function handleFicheTechniqueUpload($entityInstance): void
    {
        /** @var UploadedFile|null $file */
        $file = $this->getContext()->getRequest()->files->get('Produit')['fiche_technique'] ?? null;

        if ($file instanceof UploadedFile) {
            $fileName = uniqid() . '.' . $file->guessExtension();
            $file->move('uploads/fiches_techniques', $fileName);
            $entityInstance->setFicheTechnique('/uploads/fiches_techniques/' . $fileName);
        }
    }

    
}
