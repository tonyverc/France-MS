<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use App\Entity\Categorie;
use App\Entity\SousCategorie;
use App\Entity\Produit;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $admin = new Admin();
        $admin->setNom('Admin');
        $admin->setEmail('admin@example.com');
        $hashedPassword = $this->passwordHasher->hashPassword($admin, 'admin123');
        $admin->setPassword($hashedPassword);

        $manager->persist($admin);

        // Images par catégorie (placeholder ou réelles)
        $imagesCategories = [
            'Lubrifiants' => 'https://via.placeholder.com/400x200?text=Lubrifiants',
            'Filtres' => 'https://via.placeholder.com/400x200?text=Filtres',
            'Graisses' => 'https://via.placeholder.com/400x200?text=Graisses',
        ];

        $categoriesData = [
            'Lubrifiants' => ['Huile moteur', 'Huile transmission'],
            'Graisses' => ['Graisse moteur', 'Graisse transmission'],
            'Filtrations' => ['Filtre moteur', 'Filtre transmission'],
        ];

    foreach ($categoriesData as $catNom => $sousCats) {
        $categorie = new Categorie();
        $categorie->setNom($catNom);
        $manager->persist($categorie);

        foreach ($sousCats as $scNom) {
            $sousCat = new SousCategorie();
            $sousCat->setNom($scNom)
                    ->setCategorie($categorie);
            $manager->persist($sousCat);

            // Créer 1 produit minimum pour cette sous-catégorie
            $produit = new Produit();
            $produit->setNom($faker->word())
                    ->setDescription($faker->sentence(6))
                    ->setFicheTechnique(substr($faker->sentence(10), 0, 255))
                    ->setImage("https://picsum.photos/400/300?random=" . $faker->numberBetween(1, 1000))
                    ->addSousCategorie($sousCat); // lié uniquement à cette sous-catégorie

            $manager->persist($produit);
        }
    }

            $manager->flush();}

}