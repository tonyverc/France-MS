<?php
namespace App\Controller\Api;

use App\Entity\Categorie;
use App\Entity\SousCategorie;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

#[Route('/api')]
class ProduitController extends AbstractController
{
    // Tous les produits d'une catégorie (toutes sous-catégories comprises)
    #[Route('/categories/{id}/produits', name: 'api_categorie_produits', methods: ['GET'])]
    public function produitsCategorie(int $id, EntityManagerInterface $em): JsonResponse
    {
        $categorie = $em->getRepository(Categorie::class)->find($id);
        if (!$categorie) return $this->json(['error' => 'Catégorie introuvable'], 404);

        $produits = [];
        foreach ($categorie->getSousCategorie() as $sousCat) {
            foreach ($sousCat->getProduits() as $produit) {
                $produits[] = [
                    'id' => $produit->getId(),
                    'nom' => $produit->getNom(),
                    'description' => $produit->getDescription(),
                    'image' => $produit->getImage(),
                    'fiche_technique' => $produit->getFicheTechnique(),
                    'sousCategorie' => $sousCat->getNom()
                ];
            }
        }

        return $this->json($produits);
    }

    //  Tous les produits d'une sous-catégorie
    #[Route('/souscategories/{id}/produits', name: 'api_souscategorie_produits', methods: ['GET'])]
    public function produitsSousCategorie(int $id, EntityManagerInterface $em): JsonResponse
    {
        $sousCat = $em->getRepository(SousCategorie::class)->find($id);
        if (!$sousCat) return $this->json(['error' => 'Sous-catégorie introuvable'], 404);

        $produits = [];
        foreach ($sousCat->getProduits() as $produit) {
            $produits[] = [
                'id' => $produit->getId(),
                'nom' => $produit->getNom(),
                'image' => $produit->getImage(),
                'description' => $produit->getDescription(),
                'fiche_technique' => $produit->getFicheTechnique(),
                'sousCategorie' => $sousCat->getNom()
            ];
        }

        return $this->json($produits);
    }

    // Liste des catégories principales
    #[Route('/categories', name: 'api_categories', methods: ['GET'])]
    public function listCategories(EntityManagerInterface $em): JsonResponse
    {
        $categories = $em->getRepository(Categorie::class)->findAll();
        $data = [];
        foreach ($categories as $cat) {
            $data[] = [
                'id' => $cat->getId(),
                'nom' => $cat->getNom()
            ];
        }
        return $this->json($data);
    }

    // Liste des sous-catégories d'une catégorie
    #[Route('/categories/{id}/souscategories', name: 'api_souscategories', methods: ['GET'])]
    public function listSousCategories(int $id, EntityManagerInterface $em): JsonResponse
    {
        $categorie = $em->getRepository(Categorie::class)->find($id);
        if (!$categorie) return $this->json(['error' => 'Catégorie introuvable'], 404);

        $sousCategories = [];
        foreach ($categorie->getSousCategorie() as $sousCat) {
            $sousCategories[] = [
                'id' => $sousCat->getId(),
                'nom' => $sousCat->getNom()
            ];
        }

        return $this->json($sousCategories);
    }
}
