import { defineQuery } from "next-sanity";

export const CONCERTS_QUERY = defineQuery(`*[_type == "concert" && date >= now()] | order(date asc) {
  _id,
  artist,
  "slug": slug.current,
  date,
  venue,
  theme,
  portada,
  mainImage
}`);

export const CONCERT_BY_SLUG_QUERY = defineQuery(`*[_type == "concert" && slug.current == $slug][0] {
  _id,
  artist,
  "slug": slug.current,
  date,
  venue,
  theme,
  tourName,
  description,
  seoKeyword,
  mainImage,
  portada,
  articulo
}`);

// Queries para Comunas
export const COMMUNES_QUERY = defineQuery(`*[_type == "comuna"] | order(orden asc) {
  name,
  "slug": slug.current
}`);

export const COMMUNE_BY_SLUG_QUERY = defineQuery(`*[_type == "comuna" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  price,
  subtitle,
  description,
  bgImage,
  portada,
  articulo
}`);
