<?php

namespace App\Controller\Api;

use App\Repository\ProduitRepository;
use App\Repository\CategorieRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api', name: 'api_')]
class ProduitController extends AbstractController
{
    // ------------------- PRODUITS -------------------
    #[Route('/produits', name: 'produits_list', methods: ['GET'])]
    public function produitsList(ProduitRepository $produitRepository, Request $request): JsonResponse
    {
        $sousCategorieId = $request->query->get('sous_categorie');
        $search = $request->query->get('search');

        $produits = $produitRepository->findAll();
        $data = [];

        foreach ($produits as $prod) {
            if ($sousCategorieId) {
                $hasSousCat = false;
                foreach ($prod->getSousCategorie() as $sub) {
                    if ($sub->getId() == $sousCategorieId) {
                        $hasSousCat = true;
                        break;
                    }
                }
                if (!$hasSousCat) continue;
            }

            if ($search && stripos($prod->getNom(), $search) === false) {
                continue;
            }

            $data[] = [
                'id' => $prod->getId(),
                'nom' => $prod->getNom(),
                'image' => $prod->getImage(),
                'description' => $prod->getDescription(),
                'fiche_technique' => $prod->getFicheTechnique(),
                'categorie' => $prod->getSousCategorie()->isEmpty() ? null : [
                    'id' => $prod->getSousCategorie()->first()->getCategorie()->getId(),
                    'nom' => $prod->getSousCategorie()->first()->getCategorie()->getNom(),
                ],
                'sous_categories' => array_map(fn($sub) => [
                    'id' => $sub->getId(),
                    'nom' => $sub->getNom()
                ], $prod->getSousCategorie()->toArray()),
            ];
        }

        return $this->json($data);
    }

    #[Route('/produits/{id}', name: 'produit_detail', methods: ['GET'])]
    public function produitDetail(ProduitRepository $produitRepository, int $id): JsonResponse
    {
        $produit = $produitRepository->find($id);

        if (!$produit) {
            return $this->json(['error' => 'Produit non trouvé'], 404);
        }

        $data = [
            'id' => $produit->getId(),
            'nom' => $produit->getNom(),
            'image' => $produit->getImage(),
            'description' => $produit->getDescription(),
            'fiche_technique' => $produit->getFicheTechnique(),
            'categorie' => $produit->getSousCategorie()->isEmpty() ? null : [
                'id' => $produit->getSousCategorie()->first()->getCategorie()->getId(),
                'nom' => $produit->getSousCategorie()->first()->getCategorie()->getNom(),
            ],
            'sous_categories' => array_map(fn($sub) => [
                'id' => $sub->getId(),
                'nom' => $sub->getNom()
            ], $produit->getSousCategorie()->toArray()),
        ];


        return $this->json($data);
    }

    // ------------------- CATEGORIES -------------------
    #[Route('/categorie', name: 'categorie_list', methods: ['GET'])]
    public function categorieList(CategorieRepository $categorieRepository, Request $request): JsonResponse
    {
        $categorieId = $request->query->get('categorie');
        $sousCategorieId = $request->query->get('sous_categorie');
        $search = $request->query->get('search');

        $categories = $categorieRepository->findAll();
        $data = [];

        foreach ($categories as $categorie) {
            if ($categorieId && $categorie->getId() != $categorieId) {
                continue;
            }

            $subCategories = [];
            foreach ($categorie->getSousCategorie() as $sub) {
                if ($sousCategorieId && $sub->getId() != $sousCategorieId) {
                    continue;
                }

                $products = [];
                foreach ($sub->getProduits() as $prod) {
                    if ($search && stripos($prod->getNom(), $search) === false) {
                        continue;
                    }

                    $products[] = [
                        'id' => $prod->getId(),
                        'nom' => $prod->getNom(),
                        'image' => $prod->getImage(),
                        'description' => $prod->getDescription(),
                        'fiche_technique' => $prod->getFicheTechnique(),
                    ];
                }

                if (!empty($products)) {
                    $subCategories[] = [
                        'id' => $sub->getId(),
                        'nom' => $sub->getNom(),
                        'produits' => $products,
                    ];
                }
            }

            if (!empty($subCategories)) {
                $data[] = [
                    'id' => $categorie->getId(),
                    'nom' => $categorie->getNom(),
                    'sous_categories' => $subCategories,
                ];
            }
        }

        return $this->json($data);
    }
}
