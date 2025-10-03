<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use App\Entity\Categorie;
use App\Entity\SousCategorie;
use App\Entity\Produit;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        $admin = new Admin();
        $admin->setNom('Admin');
        $admin->setEmail('admin@example.com');
        $admin->setPassword('admin123');
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

            $sousCategoriesDuCat = [];

            foreach ($sousCats as $scNom) {
                $sousCat = new SousCategorie();
                $sousCat->setNom($scNom)
                    ->setCategorie($categorie);
                $manager->persist($sousCat);
                $sousCategoriesDuCat[] = $sousCat;
            }

            // Produits Faker
            $nbProduits = $faker->numberBetween(5, 8);
            for ($j = 0; $j < $nbProduits; $j++) {
                $produit = new Produit();
                $produit->setNom($faker->word())
                    ->setDescription($faker->sentence(6))
                    ->setFicheTechnique(substr($faker->sentence(10), 0, 255))
                    ->setImage("https://picsum.photos/400/300?random=" . $faker->numberBetween(1, 1000));

                // Lier 1 à 2 sous-catégories aléatoires de cette catégorie
                $randomSousCats = $faker->randomElements($sousCategoriesDuCat, $faker->numberBetween(1, 2));
                foreach ($randomSousCats as $sousCat) {
                    $produit->addSousCategorie($sousCat);
                }

                $manager->persist($produit);
            }
        }

        $manager->flush();
    }
}
