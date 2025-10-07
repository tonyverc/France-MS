export interface Produit {
  id: number;
  nom: string;
  image: string;
  description: string;
  fiche_technique: string;
  sousCategories: SousCategorie[];
}

export interface SousCategorie {
  id: number;
  nom: string;
  categorie : Categorie [];
}

export interface Categorie {
  id: number;
  nom: string;
  icon?: string;
  sous_categories?: SousCategorie[];
  imageUrl?: string;
  description?: string;
  link?: string;
}