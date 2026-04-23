import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        personalDetails: true,
        experiences: true,
        education: true,
        projects: true,
        languages: true,
        certifications: true,
      },
    });

    if (!user) {
      return NextResponse.json(null);
    }

    // Format the response to match the frontend Zustand store
    return NextResponse.json({
      personalDetails: user.personalDetails || {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        portfolio: "",
        photo: "",
      },
      summary: user.summary || "",
      experiences: user.experiences || [],
      education: user.education || [],
      skills: user.skills || [],
      projects: user.projects || [],
      languages: user.languages || [],
      certifications: user.certifications || [],
      settings: {
        accentColor: user.accentColor,
      },
    });
  } catch (error) {
    console.error("[CV_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const { 
      personalDetails, 
      summary, 
      experiences, 
      education, 
      skills, 
      projects, 
      languages, 
      certifications,
      settings 
    } = body;

    // Use a transaction to ensure atomic updates
    const result = await prisma.$transaction(async (tx) => {
      // 1. Upsert the User
      const user = await tx.user.upsert({
        where: { id: userId },
        update: {
          summary,
          skills,
          accentColor: settings?.accentColor || "#2563eb",
        },
        create: {
          id: userId,
          summary,
          skills,
          accentColor: settings?.accentColor || "#2563eb",
        },
      });

      // 2. Handle PersonalDetails
      await tx.personalDetails.upsert({
        where: { userId },
        update: { ...personalDetails },
        create: { ...personalDetails, userId },
      });

      // 3. Sync Arrays (Delete and Re-create for simplicity)
      await tx.experience.deleteMany({ where: { userId } });
      if (experiences?.length > 0) {
        await tx.experience.createMany({
          data: experiences.map((exp: any) => ({
            ...exp,
            userId,
            id: undefined, // Let DB generate new IDs or use cuid
          })),
        });
      }

      await tx.education.deleteMany({ where: { userId } });
      if (education?.length > 0) {
        await tx.education.createMany({
          data: education.map((edu: any) => ({
            ...edu,
            userId,
            id: undefined,
          })),
        });
      }

      await tx.project.deleteMany({ where: { userId } });
      if (projects?.length > 0) {
        await tx.project.createMany({
          data: projects.map((p: any) => ({
            ...p,
            userId,
            id: undefined,
          })),
        });
      }

      await tx.language.deleteMany({ where: { userId } });
      if (languages?.length > 0) {
        await tx.language.createMany({
          data: languages.map((l: any) => ({
            ...l,
            userId,
            id: undefined,
          })),
        });
      }

      await tx.certification.deleteMany({ where: { userId } });
      if (certifications?.length > 0) {
        await tx.certification.createMany({
          data: certifications.map((c: any) => ({
            ...c,
            userId,
            id: undefined,
          })),
        });
      }

      return user;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[CV_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
