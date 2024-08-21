import { Input } from "./ui/input";

export default function ReportForm() {
  return (
    <div className="flex flex-col items-center">
      <p>Whats wrong with this venue?</p>
      <Input placeholder="Type in the issue" className="m-3"></Input>
    </div>
  );
}
