<?php

namespace App\DataFixtures;

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

        // Images par catégorie (placeholder ou réelles)
        $imagesCategories = [
            'Lubrifiants' => 'https://via.placeholder.com/400x200?text=Lubrifiants',
            'Filtres' => 'https://via.placeholder.com/400x200?text=Filtres',
            'Graisses' => 'https://via.placeholder.com/400x200?text=Graisses',
        ];

        $categories = [];
        foreach (['Lubrifiants', 'Filtres', 'Graisses'] as $catNom) {
            $cat = new Categorie();
            $cat->setNom($catNom);
            $manager->persist($cat);
            $categories[] = $cat;
        }

        foreach ($categories as $cat) {
            $sousCategoriesDuCat = [];

            for ($i = 0; $i < 2; $i++) {
                $sousCat = new SousCategorie();
                $sousCat->setNom($faker->word())
                         ->setCategorie($cat);
                $manager->persist($sousCat);
                $sousCategoriesDuCat[] = $sousCat;
            }

            $nbProduits = $faker->numberBetween(5, 8);
            for ($j = 0; $j < $nbProduits; $j++) {
                $produit = new Produit();
                $produit->setNom($faker->word())
                        ->setDescription($faker->sentence(6))
                        ->setFicheTechnique($faker->sentence(10))
                        // Image aléatoire pour le produit
                        ->setImage("https://picsum.photos/400/300?random=" . $faker->numberBetween(1, 1000));

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
