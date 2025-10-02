export interface Produit {
  id: number;
  nom: string;
  image: string;
  description: string;
  fiche_technique: string;
  sousCategorie: string;
}

export interface SousCategorie {
  id: number;
  nom: string;
  produits: Produit[];
}

export interface Categorie {
  id: number;
  nom: string;
  sous_categories?: SousCategorie[];
  imageUrl?: string;
  description?: string;
  link?: string;
}