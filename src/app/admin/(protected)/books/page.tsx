import { Separator } from "@/components/ui/separator";
import {
  FadeIn,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { BookSearch } from "@/components/books/book-search";

export const metadata = {
  title: "Books | Dr M Islam",
};

// Hardcoded books array pointing to the public folder
const books = [
  {
    id: 1,
    title: "A Dictionary of Practical Materia Medica",
    thumbnail: "/books/a-dictionary-of-practical-materia-medica.webp",
    url: "/books/a-dictionary-of-practical-materia-medica.pdf",
  },
  {
    id: 2,
    title: "Repertory of the Homoeopathic Materia Medica",
    thumbnail: "/books/repertory-of-the-homoeopathic-materia-medica.webp",
    url: "/books/repertory-of-the-homoeopathic-materia-medica.pdf",
  },
  {
    id: 3,
    title: "Pearls in Medicine for Students",
    thumbnail: "/books/pearls-in-medicine-for-students.webp",
    url: "/books/pearls-in-medicine-for-students.pdf",
  },
  {
    id: 4,
    title: "Bach Flower Remedies",
    thumbnail: "/books/bach-flower-remedies.webp",
    url: "/books/bach-flower-remedies.pdf",
  },
  {
    id: 5,
    title: "The Bach Flower Remedies",
    thumbnail: "/books/the-bach-flower-remedies.webp",
    url: "/books/the-bach-flower-remedies.pdf",
  },
  {
    id: 6,
    title: "Uric Acid Diet Guide",
    thumbnail: "/books/uric-acid-diet-guide.webp",
    url: "/books/uric-acid-diet-guide.pdf",
  },
  {
    id: 7,
    title: "Harrison's Manual of Medicine",
    thumbnail: "/books/harrisons-manual-of-medicine.webp",
    url: "/books/harrisons-manual-of-medicine.pdf",
  },
  {
    id: 8,
    title: "Organon of Medicine",
    thumbnail: "/books/organon-of-medicine.webp",
    url: "/books/organon-of-medicine.pdf",
  },
  {
    id: 9,
    title: "Allen's Keynotes",
    thumbnail: "/books/allens-keynotes.webp",
    url: "/books/allens-keynotes.pdf",
  },
  {
    id: 10,
    title: "Homoeopathic Materia Medica",
    thumbnail: "/books/homoeopathic-materia-medica.webp",
    url: "/books/homoeopathic-materia-medica.pdf",
  },
  {
    id: 11,
    title: "Manipal Manual of Surgery",
    thumbnail: "/books/manipal-manual-of-surgery.webp",
    url: "/books/manipal-manual-of-surgery.pdf",
  },
  {
    id: 12,
    title: "Forensic Medicine and Toxicology",
    thumbnail: "/books/forensic-medicine-and-toxicology.webp",
    url: "/books/forensic-medicine-and-toxicology.pdf",
  },
  {
    id: 13,
    title:
      "Illustrated Synopsis of Dermatology and Sexually Transmitted Diseases",
    thumbnail:
      "/books/illustrated-synopsis-of-dermatology-and-sexually-transmitted-diseases.webp",
    url: "/books/illustrated-synopsis-of-dermatology-and-sexually-transmitted-diseases.pdf",
  },
  {
    id: 14,
    title: "Manual of Clinical Cases in ENT and Head Neck Surgery",
    thumbnail:
      "/books/manual-of-clinical-cases-in-ent-and-head-neck-surgery.webp",
    url: "/books/manual-of-clinical-cases-in-ent-and-head-neck-surgery.pdf",
  },
  {
    id: 15,
    title: "Diseases of the Ear, Nose and Throat",
    thumbnail: "/books/diseases-of-the-ear-nose-and-throat.webp",
    url: "/books/diseases-of-the-ear-nose-and-throat.pdf",
  },
  {
    id: 16,
    title: "Parsons Diseases of the Eye",
    thumbnail: "/books/parsons-diseases-of-the-eye.webp",
    url: "/books/parsons-diseases-of-the-eye.pdf",
  },
  {
    id: 17,
    title: "Psychiatry",
    thumbnail: "/books/psychiatry.webp",
    url: "/books/psychiatry.pdf",
  },
  {
    id: 18,
    title: "Orthopaedics",
    thumbnail: "/books/orthopaedics.webp",
    url: "/books/orthopaedics.pdf",
  },
  {
    id: 19,
    title: "Shorts Notes on BTPB, BBCR and Kent's Repertory",
    thumbnail: "/books/shorts-notes-on-btpb-bbcr-and-kents-repertory.webp",
    url: "/books/shorts-notes-on-btpb-bbcr-and-kents-repertory.pdf",
  },
  {
    id: 20,
    title: "Kent's Comparative Repertory of the Homoeopathic Materia Medica",
    thumbnail:
      "/books/kents-comparative-repertory-of-the-homoeopathic-materia-media.webp",
    url: "/books/kents-comparative-repertory-of-the-homoeopathic-materia-media.pdf",
  },
  {
    id: 21,
    title: "Lectures on Homoeopathic Materia Medica",
    thumbnail: "/books/lectures-on-homoeopathic-materia-medica.webp",
    url: "/books/lectures-on-homoeopathic-materia-medica.pdf",
  },
  {
    id: 22,
    title: "Lesser Writings",
    thumbnail: "/books/lesser-writings.webp",
    url: "/books/lesser-writings.pdf",
  },
  {
    id: 23,
    title: "Materia Medica of Indian Drugs",
    thumbnail: "/books/materia-medica-of-indian-drugs.webp",
    url: "/books/materia-medica-of-indian-drugs.pdf",
  },
  {
    id: 24,
    title: "Julian's Materia Medica of Nosodes with Repertory",
    thumbnail: "/books/julians-materia-medica-of-nosodes-with-repertory.webp",
    url: "/books/julians-materia-medica-of-nosodes-with-repertory.pdf",
  },
  {
    id: 25,
    title: "Augmented Textbook of Homoeopathic Pharmacy",
    thumbnail: "/books/augmented-textbook-of-homeopathic-pharmacy.webp",
    url: "/books/augmented-textbook-of-homeopathic-pharmacy.pdf",
  },
  {
    id: 26,
    title: "The Significance of Past History in Homoeopathic Prescribing",
    thumbnail:
      "/books/the-significance-of-past-history-in-homoeopathic-prescribing.webp",
    url: "/books/the-significance-of-past-history-in-homoeopathic-prescribing.pdf",
  },
  {
    id: 27,
    title: "Bach Flower Remedies for Women",
    thumbnail: "/books/bach-flower-remedies-for-women.webp",
    url: "/books/bach-flower-remedies-for-women.pdf",
  },
];

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q =
    typeof resolvedParams.q === "string" ? resolvedParams.q.toLowerCase() : "";

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(q),
  );

  return (
    <main className="container max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-2 pb-8 space-y-6">
      {/* Page Header */}
      <FadeIn delay={0.1}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Books Library
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Access medical references, textbooks, and reading materials.
            </p>
          </div>
          <div className="w-full md:w-auto">
            <BookSearch />
          </div>
        </div>
      </FadeIn>

      <Separator />

      <SlideUp delay={0.2}>
        <StaggerContainer
          key={q}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <StaggerItem key={book.id}>
                <Link
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group space-y-3"
                >
                  <div className="aspect-[3/4] relative bg-muted flex items-center justify-center overflow-hidden rounded-lg">
                    {/* Fallback icon if image fails to load */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <BookOpen className="w-12 h-12" />
                    </div>
                    {/* Unoptimized img tag to prevent Next.js errors for missing local files during development */}
                    <img
                      src={book.thumbnail}
                      alt={book.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-10"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm md:text-base text-foreground truncate text-left group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                  </div>
                </Link>
              </StaggerItem>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No books found matching "{q}"
            </div>
          )}
        </StaggerContainer>
      </SlideUp>
    </main>
  );
}
