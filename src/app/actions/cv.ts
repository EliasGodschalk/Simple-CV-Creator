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
      await prisma.personalDetails.upsert({
        where: { userId },
        update: data.personalDetails,
        create: {
          ...data.personalDetails,
          userId,
        },
      });
    }

    if (data.experiences) {
      await prisma.$transaction(
        data.experiences.map((exp) =>
          prisma.experience.upsert({
            where: { id: exp.id },
            update: { ...exp, userId },
            create: { ...exp, userId },
          })
        )
      );
    }

    if (data.education) {
      await prisma.$transaction(
        data.education.map((edu) =>
          prisma.education.upsert({
            where: { id: edu.id },
            update: { ...edu, userId },
            create: { ...edu, userId },
          })
        )
      );
    }

    if (data.projects) {
      await prisma.$transaction(
        data.projects.map((proj) =>
          prisma.project.upsert({
            where: { id: proj.id },
            update: { ...proj, userId },
            create: { ...proj, userId },
          })
        )
      );
    }

    if (data.languages) {
      await prisma.$transaction(
        data.languages.map((lang) =>
          prisma.language.upsert({
            where: { id: lang.id },
            update: { ...lang, userId },
            create: { ...lang, userId },
          })
        )
      );
    }

    if (data.certifications) {
      await prisma.$transaction(
        data.certifications.map((cert) =>
          prisma.certification.upsert({
            where: { id: cert.id },
            update: { ...cert, userId },
            create: { ...cert, userId },
          })
        )
      );
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error saving CV data:", error);
    return { success: false, error: "Failed to save CV data" };
  }
}
