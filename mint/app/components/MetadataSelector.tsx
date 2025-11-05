"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PREDEFINED_METADATA_URLS = [
  "https://plum-select-octopus-670.mypinata.cloud/ipfs/bafkreifvaqx7lbu6noz6vajqkvn5onix4r46yvxttcw62iqsprr3q2kn24",
  "https://plum-select-octopus-670.mypinata.cloud/ipfs/bafkreifwec5a5ykwsxer42ex4suvs5gljkhov6qzzuvawyuudnhyjcl74a",
  "https://plum-select-octopus-670.mypinata.cloud/ipfs/bafkreid74qvqklh2aogsqwiv2bemwf3sumo24thylywmukyeqars3lo4au",
];

interface MetadataInfo {
  url: string;
  name: string;
  loading: boolean;
}

interface MetadataSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function MetadataSelector({ value, onValueChange }: MetadataSelectorProps) {
  const [metadataList, setMetadataList] = useState<MetadataInfo[]>(
    PREDEFINED_METADATA_URLS.map((url) => ({
      url,
      name: "Loading...",
      loading: true,
    }))
  );

  useEffect(() => {
    const fetchAllMetadata = async () => {
      const promises = PREDEFINED_METADATA_URLS.map(async (url, index) => {
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error("Failed to fetch");
          const metadata = await response.json();
          return {
            url,
            name: metadata.name || `NFT #${index + 1}`,
            loading: false,
          };
        } catch (error) {
          console.error(`Error fetching metadata for ${url}:`, error);
          return {
            url,
            name: `NFT #${index + 1} (Failed to load)`,
            loading: false,
          };
        }
      });

      const results = await Promise.all(promises);
      setMetadataList(results);
    };

    fetchAllMetadata();
  }, []);

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="font-mono text-sm bg-background/50 border-primary/30 focus:border-accent focus:ring-accent/50 transition-all">
        <SelectValue placeholder="Select a predefined NFT metadata..." />
      </SelectTrigger>
      <SelectContent className="bg-card/95 backdrop-blur-xl border-primary/30">
        {metadataList.map((nft, index) => (
          <SelectItem
            key={nft.url}
            value={nft.url}
            className="font-mono text-sm hover:bg-accent/20 focus:bg-accent/20 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-accent">#{index + 1}</span>
              <span className={`text-primary/80 ${nft.loading ? "animate-pulse" : ""}`}>
                {nft.name}
              </span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
