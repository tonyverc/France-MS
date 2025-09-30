<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use App\Entity\SousCategorie;
use App\Entity\Produit;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categorie = new Categorie();
        $categorie->setNom('Lubrifiants');

        $categorie2= new Categorie();
        $categorie2->setNom('graisses');

        $sousCategorie4 = new SousCategorie();
        $sousCategorie4->setNom('graisse moteur');
        $sousCategorie4->setCategorie($categorie2);

        $sousCategorie = new SousCategorie();
        $sousCategorie->setNom('Huile moteur');
        $sousCategorie->setCategorie($categorie);

        $sousCategorie2 = new SousCategorie();
        $sousCategorie2->setNom('Huile transmission');
        $sousCategorie2->setCategorie($categorie);

        $sousCategorie3 = new SousCategorie();
        $sousCategorie3->setNom('Huile frein');
        $sousCategorie3->setCategorie($categorie);

        $produit = new Produit();
        $produit->setNom('Huile moteur 5W30')
                ->setImage('huile.jpg')
                ->setDescription('Huile haute performance')
                ->setFicheTechnique('fiche.pdf');
        $produit->addSousCategorie($sousCategorie);

        $produit2 = new Produit();
        $produit2->setNom('Huile moteur 10W40')
                ->setImage('huile.jpg')
                ->setDescription('Huile haute performance')
                ->setFicheTechnique('fiche.pdf');
        $produit2->addSousCategorie($sousCategorie);

        $produit3 = new Produit();
        $produit3->setNom('Huile moteur 20W50')
                ->setImage('huile.jpg')
                ->setDescription('Huile haute performance')
                ->setFicheTechnique('fiche.pdf');
        $produit3->addSousCategorie($sousCategorie);

        $produit4 = new Produit();
        $produit4->setNom('graisse castrol')
                ->setImage('graisse.jpg')
                ->setDescription('graisse haute performance')
                ->setFicheTechnique('fiche.pdf');
        $produit4->addSousCategorie($sousCategorie4);



        $manager->persist($categorie);
        $manager->persist($categorie2);
        $manager->persist($sousCategorie);
        $manager->persist($sousCategorie2);
        $manager->persist($sousCategorie3);
        $manager->persist($sousCategorie4);
        $manager->persist($produit);
        $manager->persist($produit2);
        $manager->persist($produit3);
        $manager->persist($produit4);

        $manager->flush();
    }
}
