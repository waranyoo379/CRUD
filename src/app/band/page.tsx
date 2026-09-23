import BandExplorer from "@/components/BandExplorer";
import { favoriteBands } from "@/data/bands";

export default function BandsPage() {
  return <BandExplorer initialBands={favoriteBands} />;
}