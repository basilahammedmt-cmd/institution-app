import { NextResponse } from "next/server";
import {
  INITIAL_BATCHES,
  INITIAL_STUDENTS,
  INITIAL_ATTENDANCE,
  INITIAL_FACULTY_CHAPTERS,
  INITIAL_EXAMS,
  INITIAL_ATTEMPTS,
  INITIAL_LIVE_CLASSES,
  INITIAL_QUESTION_BANK,
} from "@/lib/store";

export async function GET() {
  return NextResponse.json({
    batches: INITIAL_BATCHES,
    students: INITIAL_STUDENTS,
    attendance: INITIAL_ATTENDANCE,
    facultyChapters: INITIAL_FACULTY_CHAPTERS,
    exams: INITIAL_EXAMS,
    attempts: INITIAL_ATTEMPTS,
    liveClasses: INITIAL_LIVE_CLASSES,
    questionBank: INITIAL_QUESTION_BANK,
  });
}
