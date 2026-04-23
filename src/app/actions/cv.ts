'use server';

import { prisma } from "@/lib/prisma";
import { cvSchema, CVDto } from "@/lib/validations/cv";
import { revalidatePath } from "next/cache";

export async function saveCVData(userId: string, rawData: unknown) {
  try {
    // Validate the incoming data with Zod
    const result = cvSchema.safeParse(rawData);
    if (!result.success) {
      return { success: false, errors: result.error.flatten() };
    }

    const data: CVDto = result.data;

    // Use Prisma to update the user and their relations
    await prisma.user.upsert({
      where: { id: userId },
      update: {
        summary: data.summary,
        skills: data.skills,
        accentColor: data.settings?.accentColor,
      },
      create: {
        id: userId,
        summary: data.summary,
        skills: data.skills ?? [],
        accentColor: data.settings?.accentColor ?? "#2563eb",
      },
    });

    if (data.personalDetails) {
      const pd = {
        ...data.personalDetails,
        phone: data.personalDetails.phone || "",
        location: data.personalDetails.location || "",
        linkedin: data.personalDetails.linkedin || "",
        portfolio: data.personalDetails.portfolio || "",
        photo: data.personalDetails.photo || null,
      };
      await prisma.personalDetails.upsert({
        where: { userId },
        update: pd,
        create: {
          ...pd,
          userId,
        },
      });
    }

    if (data.experiences) {
      await prisma.$transaction(
        data.experiences.map((exp) => {
          const mappedExp = {
            ...exp,
            location: exp.location || "",
            endDate: exp.endDate || "",
            description: exp.description || "",
          };
          return prisma.experience.upsert({
            where: { id: exp.id },
            update: { ...mappedExp, userId },
            create: { ...mappedExp, userId },
          });
        })
      );
    }

    if (data.education) {
      await prisma.$transaction(
        data.education.map((edu) => {
          const mappedEdu = {
            ...edu,
            location: edu.location || "",
            endDate: edu.endDate || "",
            description: edu.description || "",
          };
          return prisma.education.upsert({
            where: { id: edu.id },
            update: { ...mappedEdu, userId },
            create: { ...mappedEdu, userId },
          });
        })
      );
    }

    if (data.projects) {
      await prisma.$transaction(
        data.projects.map((proj) => {
          const mappedProj = {
            ...proj,
            description: proj.description || "",
            techStack: proj.techStack || "",
            link: proj.link || "",
            githubUrl: proj.githubUrl || "",
          };
          return prisma.project.upsert({
            where: { id: proj.id },
            update: { ...mappedProj, userId },
            create: { ...mappedProj, userId },
          });
        })
      );
    }

    if (data.languages) {
      await prisma.$transaction(
        data.languages.map((lang) => {
          const mappedLang = {
            ...lang,
            protocol: lang.protocol || "",
          };
          return prisma.language.upsert({
            where: { id: lang.id },
            update: { ...mappedLang, userId },
            create: { ...mappedLang, userId },
          });
        })
      );
    }

    if (data.certifications) {
      await prisma.$transaction(
        data.certifications.map((cert) => {
          const mappedCert = {
            ...cert,
            date: cert.date || "",
            link: cert.link || "",
          };
          return prisma.certification.upsert({
            where: { id: cert.id },
            update: { ...mappedCert, userId },
            create: { ...mappedCert, userId },
          });
        })
      );
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error saving CV data:", error);
    return { success: false, error: "Failed to save CV data" };
  }
}
