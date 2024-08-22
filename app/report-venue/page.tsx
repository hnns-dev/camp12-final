import ReportForm from "@/components/report-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReportVenue() {
  return (
    <main className="m-4">
      <Link href="/" className="text-2xl ml-2">
        ←
      </Link>
      {/* header */}
      <section className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold">Report about a venue</h1>
        <h2 className="text-base">is there something wrong?</h2>
      </section>
      <section className="flex flex-col ">
        <ReportForm />
        <Button className="m-5">Report</Button>
      </section>
    </main>
  );
}
