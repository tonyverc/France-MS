<?php

namespace App\Entity;

use App\Repository\ProduitRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProduitRepository::class)]
class Produit
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $nom = null;

    #[ORM\Column(length: 255)]
    private ?string $image = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column(length: 100)]
    private ?string $fiche_technique = null;

    /**
     * @var Collection<int, SousCategorie>
     */
    #[ORM\ManyToMany(targetEntity: SousCategorie::class, inversedBy: 'produits')]
    private Collection $sous_categorie;

    #[ORM\ManyToOne(inversedBy: 'produit')]
    private ?Admin $admi = null;

    public function __construct()
    {
        $this->sous_categorie = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): static
    {
        $this->nom = $nom;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getFicheTechnique(): ?string
    {
        return $this->fiche_technique;
    }

    public function setFicheTechnique(string $fiche_technique): static
    {
        $this->fiche_technique = $fiche_technique;

        return $this;
    }

    /**
     * @return Collection<int, SousCategorie>
     */
    public function getSousCategorie(): Collection
    {
        return $this->sous_categorie;
    }

    /**
     * @param Collection<int, SousCategorie> $sousCategories
     */
    public function setSousCategorie(Collection $sousCategories): static
    {
        $this->sous_categorie = $sousCategories;
        return $this;
    }

    public function addSousCategorie(SousCategorie $sousCategorie): static
    {
        if (!$this->sous_categorie->contains($sousCategorie)) {
            $this->sous_categorie->add($sousCategorie);
        }

        return $this;
    }

    public function removeSousCategorie(SousCategorie $sousCategorie): static
    {
        $this->sous_categorie->removeElement($sousCategorie);

        return $this;
    }

    public function getAdmi(): ?Admin
    {
        return $this->admi;
    }

    public function setAdmi(?Admin $admi): static
    {
        $this->admi = $admi;

        return $this;
    }
}
