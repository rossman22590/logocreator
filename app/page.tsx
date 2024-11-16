"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, useUser } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";
import { DownloadIcon, RefreshCwIcon } from "lucide-react";

import Spinner from "@/app/components/Spinner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { domain } from "@/app/lib/domain";
import InfoTooltip from "./components/InfoToolTip";

const logoStyles = [
  { name: "Tech", icon: "/tech.svg" },
  { name: "Flashy", icon: "/flashy.svg" },
  { name: "Modern", icon: "/modern.svg" },
  { name: "Playful", icon: "/playful.svg" },
  { name: "Abstract", icon: "/abstract.svg" },
  { name: "Minimal", icon: "/minimal.svg" },
];



const primaryColors = [
  { name: "Blue", color: "#0F6FFF" },
  { name: "Red", color: "#FF0000" },
  { name: "Green", color: "#00FF00" },
  { name: "Yellow", color: "#FFFF00" },
  { name: "Orange", color: "#FFA500" },
  { name: "Purple", color: "#800080" },
  { name: "Pink", color: "#FFC0CB" },
  { name: "Cyan", color: "#00FFFF" },
  { name: "Magenta", color: "#FF00FF" },
  { name: "Brown", color: "#A52A2A" },
  { name: "Lime", color: "#00FF00" },
  { name: "Teal", color: "#008080" },
  { name: "Navy", color: "#000080" },
  { name: "Olive", color: "#808000" },
  { name: "Maroon", color: "#800000" },
  { name: "Gold", color: "#FFD700" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "Coral", color: "#FF7F50" },
  { name: "Salmon", color: "#FA8072" },
  { name: "Crimson", color: "#DC143C" },
  { name: "Indigo", color: "#4B0082" },
  { name: "Violet", color: "#EE82EE" },
  { name: "Turquoise", color: "#40E0D0" },
  { name: "Slate Blue", color: "#6A5ACD" },
  { name: "Slate Gray", color: "#708090" },
  { name: "Dark Green", color: "#006400" },
  { name: "Dark Orange", color: "#FF8C00" },
  { name: "Dark Violet", color: "#9400D3" },
  { name: "Dark Red", color: "#8B0000" },
  { name: "Light Blue", color: "#ADD8E6" },
  { name: "Light Green", color: "#90EE90" },
  { name: "Light Pink", color: "#FFB6C1" },
  { name: "Light Yellow", color: "#FFFFE0" },
  { name: "Light Coral", color: "#F08080" },
  { name: "Peach", color: "#FFDAB9" },
  { name: "Lavender", color: "#E6E6FA" },
  { name: "Mint", color: "#98FF98" },
  { name: "Ivory", color: "#FFFFF0" },
  { name: "Beige", color: "#F5F5DC" },
  { name: "Khaki", color: "#F0E68C" },
  { name: "Tomato", color: "#FF6347" },
  { name: "Medium Sea Green", color: "#3CB371" },
  { name: "Medium Slate Blue", color: "#7B68EE" },
  { name: "Medium Orchid", color: "#BA55D3" },
  { name: "Medium Turquoise", color: "#48D1CC" },
  { name: "Medium Violet Red", color: "#C71585" },
  { name: "Pale Green", color: "#98FB98" },
  { name: "Pale Goldenrod", color: "#EEE8AA" },
  { name: "Pale Turquoise", color: "#AFEEEE" },
  { name: "Light Steel Blue", color: "#B0C4DE" },
];

const backgroundColors = [
  { name: "White", color: "#FFFFFF" },
  { name: "Gray", color: "#CCCCCC" },
  { name: "Black", color: "#000000" },
  { name: "Light Gray", color: "#D3D3D3" },
  { name: "Dark Gray", color: "#A9A9A9" },
  { name: "Light Blue", color: "#ADD8E6" },
  { name: "Light Green", color: "#90EE90" },
  { name: "Light Yellow", color: "#FFFFE0" },
  { name: "Light Coral", color: "#F08080" },
  { name: "Lavender", color: "#E6E6FA" },
  { name: "Peach", color: "#FFDAB9" },
  { name: "Mint", color: "#98FF98" },
  { name: "Ivory", color: "#FFFFF0" },
  { name: "Beige", color: "#F5F5DC" },
  { name: "Khaki", color: "#F0E68C" },
  { name: "Coral", color: "#FF7F50" },
  { name: "Light Salmon", color: "#FFA07A" },
  { name: "Wheat", color: "#F5DEB3" },
  { name: "Linen", color: "#FAF0E6" },
  { name: "Honeydew", color: "#F0FFF0" },
  { name: "Lavender Blush", color: "#FFF0F5" },
  { name: "Misty Rose", color: "#FFE4E1" },
  { name: "Old Lace", color: "#FDF5E6" },
  { name: "Papaya Whip", color: "#FFEFD5" },
  { name: "Sea Shell", color: "#FFF5EE" },
  { name: "Light Goldenrod Yellow", color: "#FAFAD2" },
  { name: "Floral White", color: "#FFFAF0" },
  { name: "Ghost White", color: "#F8F8FF" },
  { name: "Snow", color: "#FFFAFA" },
  { name: "Mint Cream", color: "#F5FFFA" },
  { name: "Azure", color: "#F0FFFF" },
  { name: "Alice Blue", color: "#F0F8FF" },
  { name: "Antique White", color: "#FAEBD7" },
  { name: "Beige", color: "#F5F5DC" },
  { name: "Blanched Almond", color: "#FFEBCD" },
  { name: "Burlywood", color: "#DEB887" },
  { name: "Chocolate", color: "#D2691E" },
  { name: "Cornflower Blue", color: "#6495ED" },
  { name: "Dark Khaki", color: "#BDB76B" },
  { name: "Firebrick", color: "#B22222" },
  { name: "Forest Green", color: "#228B22" },
  { name: "Gainsboro", color: "#DCDCDC" },
  { name: "Goldenrod", color: "#DAA520" },
  { name: "Light Cyan", color: "#E0FFFF" },
  { name: "Light Sea Green", color: "#20B2AA" },
  { name: "Medium Purple", color: "#9370DB" },
  { name: "Medium Sea Green", color: "#3CB371" },
  { name: "Medium Slate Blue", color: "#7B68EE" },
  { name: "Medium Turquoise", color: "#48D1CC" },
  { name: "Pale Goldenrod", color: "#EEE8AA" },
  { name: "Pale Violet Red", color: "#DB7093" },
  { name: "Rosy Brown", color: "#BC8F8F" },
  { name: "Sandy Brown", color: "#F4A460" },
  { name: "Slate Gray", color: "#708090" },
  { name: "Steel Blue", color: "#4682B4" },
  { name: "Thistle", color: "#D8BFD8" },
  { name: "Tomato", color: "#FF6347" },
  { name: "Turquoise", color: "#40E0D0" },
];

export default function Page() {
  const [companyName, setCompanyName] = useState("");
  const [selectedStyle, setSelectedStyle] = useState(logoStyles[0].name);
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState(primaryColors[0].name);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(backgroundColors[0].name);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const { isSignedIn, isLoaded, user } = useUser();

  async function generateLogo() {
    if (!isSignedIn) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to generate a logo.",
      });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const res = await fetch("/api/generate-logo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          selectedStyle,
          selectedPrimaryColor,
          selectedBackgroundColor,
          additionalInfo,
        }),
      });
  
      if (res.ok) {
        const json = await res.json();
        setGeneratedImage(`data:image/png;base64,${json.b64_json}`);
        await user.reload();
        toast({
          title: "Logo Generated",
          description: "Your logo has been successfully created!",
        });
      } else {
        throw new Error(res.statusText);
      }
    } catch (error: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description: `There was a problem generating your logo: ${(error as Error).message || 'Unknown error'}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
  <Header className="bg-gray-800 shadow-md" />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold">Create Your Dream Logo</h1>
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-lg bg-gray-800 p-6 shadow-lg lg:w-1/2"
          >
            <form onSubmit={(e) => {
              e.preventDefault();
              setGeneratedImage("");
              generateLogo();
            }} className="space-y-6">
              <div>
                <label htmlFor="company-name" className="mb-2 block text-sm font-medium">
                  Company Name
                </label>
                <Input
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name"
                  required
                  className="bg-gray-700"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Logo Style</label>
                <div className="grid grid-cols-3 gap-4">
                  {logoStyles.map((style) => (
                    <button
                      key={style.name}
                      type="button"
                      onClick={() => setSelectedStyle(style.name)}
                      className={`flex flex-col items-center rounded-lg p-2 transition-colors ${
                        selectedStyle === style.name ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      <Image src={style.icon} alt={style.name} width={48} height={48} />
                      <span className="mt-2 text-xs">{style.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="mb-2 block text-sm font-medium">Primary Color</label>
                  <Select value={selectedPrimaryColor} onValueChange={setSelectedPrimaryColor}>
                    <SelectTrigger className="bg-gray-700">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {primaryColors.map((color) => (
                          <SelectItem key={color.name} value={color.name}>
                            <div className="flex items-center">
                              <div className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: color.color }}></div>
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-1/2">
                  <label className="mb-2 block text-sm font-medium">Background Color</label>
                  <Select value={selectedBackgroundColor} onValueChange={setSelectedBackgroundColor}>
                    <SelectTrigger className="bg-gray-700">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {backgroundColors.map((color) => (
                          <SelectItem key={color.name} value={color.name}>
                            <div className="flex items-center">
                              <div className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: color.color }}></div>
                              {color.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label htmlFor="additional-info" className="mb-2 block text-sm font-medium">
                  Additional Information
                </label>
                <Textarea
                  id="additional-info"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Enter any additional details or preferences"
                  className="bg-gray-700"
                  rows={4}
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner className="mr-2" />
                ) : (
                  <Image src="/generate-icon.svg" alt="Generate" width={16} height={16} className="mr-2" />
                )}
                {isLoading ? "Generating..." : "Generate Logo"}
              </Button>
            </form>
          </motion.div>

          {/* Preview Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-lg bg-gray-800 p-6 shadow-lg lg:w-1/2"
          >
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-700">
              <AnimatePresence mode="wait">
                {generatedImage ? (
                  <motion.img
                    key="generated"
                    src={generatedImage}
                    alt="Generated Logo"
                    className="h-full w-full object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    className="flex h-full items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="text-center text-gray-400">
                      Your generated logo will appear here
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {generatedImage && (
              <div className="mt-4 flex justify-center space-x-4">
                <Button asChild>
                  <a href={generatedImage} download="logo.png">
                    <DownloadIcon className="mr-2" />
                    Download
                  </a>
                </Button>
                <Button onClick={generateLogo} disabled={isLoading}>
                  <RefreshCwIcon className="mr-2" />
                  Regenerate
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
