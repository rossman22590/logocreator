"use client";

import Spinner from "@/app/components/Spinner";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { motion } from "framer-motion";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { SignInButton, useUser } from "@clerk/nextjs";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { DownloadIcon, RefreshCwIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { domain } from "@/app/lib/domain";
import InfoTooltip from "./components/InfoToolTip";

// const layouts = [
//   { name: "Solo", icon: "/solo.svg" },
//   { name: "Side", icon: "/side.svg" },
//   { name: "Stack", icon: "/stack.svg" },
// ];

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
  // const [userAPIKey, setUserAPIKey] = useState(() => {
  //   if (typeof window !== "undefined") {
  //     return localStorage.getItem("userAPIKey") || "";
  //   }
  //   return "";
  // });
  const [companyName, setCompanyName] = useState("");
  // const [selectedLayout, setSelectedLayout] = useState(layouts[0].name);
  const [selectedStyle, setSelectedStyle] = useState(logoStyles[0].name);
  const [selectedPrimaryColor, setSelectedPrimaryColor] = useState(
    primaryColors[0].name,
  );
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    backgroundColors[0].name,
  );
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState("");

  const { isSignedIn, isLoaded, user } = useUser();

  

  async function generateLogo() {
    if (!isSignedIn) {
      return;
    }

    setIsLoading(true);

    const res = await fetch("/api/generate-logo", {
      method: "POST",
      body: JSON.stringify({
        // userAPIKey,
        companyName,
        // selectedLayout,
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
    } else if (res.headers.get("Content-Type") === "text/plain") {
      toast({
        variant: "destructive",
        title: res.statusText,
        description: await res.text(),
      });
    } else {
      toast({
        variant: "destructive",
        title: "Whoops!",
        description: `There was a problem processing your request: ${res.statusText}`,
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="flex h-screen flex-col overflow-y-auto overflow-x-hidden bg-[#343434] md:flex-row">
      <Header className="block md:hidden" />

      <div className="flex w-full flex-col md:flex-row">
        <div className="relative flex h-full w-full flex-col bg-[#2C2C2C] text-[#F3F3F3] md:max-w-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setGeneratedImage("");
              generateLogo();
            }}
            className="flex h-full w-full flex-col"
          >
            <fieldset className="flex grow flex-col" disabled={!isSignedIn}>
              <div className="flex-grow overflow-y-auto">
                <div className="px-8 pb-0 pt-4 md:px-6 md:pt-6">
                  {/* API Key Section */}
                  {/* <div className="mb-6">
                    <label
                      htmlFor="api-key"
                      className="mb-2 block text-xs font-bold uppercase text-[#F3F3F3]"
                    >
                      TOGETHER API KEY
                      <span className="ml-2 text-xs uppercase text-[#6F6F6F]">
                        [OPTIONAL]
                      </span>
                    </label>
                    <Input
                      value={userAPIKey}
                      onChange={handleAPIKeyChange}
                      placeholder="API Key"
                      type="password"
                    /> 
                  </div> */}
                  <div className="-mx-6 mb-6 h-px w-[calc(100%+48px)] bg-[#343434]"></div>
                  <div className="mb-6">
                    <label
                      htmlFor="company-name"
                      className="mb-2 block text-xs font-bold uppercase text-[#6F6F6F]"
                    >
                      Company Name
                    </label>
                    <Input
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Sam's Burgers"
                      required
                    />
                  </div>
                  {/* Layout Section */}
                  {/* <div className="mb-6">
                    <label className="mb-2 flex items-center text-xs font-bold uppercase text-[#6F6F6F]">
                      Layout
                      <InfoTooltip content="Select a layout for your logo" />
                    </label>
                    <RadioGroup.Root
                      value={selectedLayout}
                      onValueChange={setSelectedLayout}
                      className="group/root grid grid-cols-3 gap-3"
                    >
                      {layouts.map((layout) => (
                        <RadioGroup.Item
                          value={layout.name}
                          key={layout.name}
                          className="group text-[#6F6F6F] focus-visible:outline-none data-[state=checked]:text-white"
                        >
                          <Image
                            src={layout.icon}
                            alt={layout.name}
                            width={96}
                            height={96}
                            className="w-full rounded-md border border-transparent group-focus-visible:outline group-focus-visible:outline-offset-2 group-focus-visible:outline-gray-400 group-data-[state=checked]:border-white"
                          />
                          <span className="text-xs">{layout.name}</span>
                        </RadioGroup.Item>
                      ))}
                    </RadioGroup.Root>
                  </div> */}
                  {/* Logo Style Section */}
                  <div className="mb-6">
                    <label className="mb-2 flex items-center text-xs font-bold uppercase text-[#6F6F6F]">
                      STYLE
                      <InfoTooltip content="Choose a style for your logo" />
                    </label>
                    <RadioGroup.Root
                      value={selectedStyle}
                      onValueChange={setSelectedStyle}
                      className="grid grid-cols-3 gap-3"
                    >
                      {logoStyles.map((logoStyle) => (
                        <RadioGroup.Item
                          value={logoStyle.name}
                          key={logoStyle.name}
                          className="group text-[#6F6F6F] focus-visible:outline-none data-[state=checked]:text-white"
                        >
                          <Image
                            src={logoStyle.icon}
                            alt={logoStyle.name}
                            width={96}
                            height={96}
                            className="w-full rounded-md border border-transparent group-focus-visible:outline group-focus-visible:outline-offset-2 group-focus-visible:outline-gray-400 group-data-[state=checked]:border-white"
                          />
                          <span className="text-xs">{logoStyle.name}</span>
                        </RadioGroup.Item>
                      ))}
                    </RadioGroup.Root>
                  </div>
                  {/* Color Picker Section */}
                  <div className="mb-[25px] flex flex-col md:flex-row md:space-x-3">
                    <div className="mb-4 flex-1 md:mb-0">
                      <label className="mb-1 block text-xs font-bold uppercase text-[#6F6F6F]">
                        Primary
                      </label>
                      <Select
                        value={selectedPrimaryColor}
                        onValueChange={setSelectedPrimaryColor}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {primaryColors.map((color) => (
                              <SelectItem key={color.color} value={color.name}>
                                <span className="flex items-center">
                                  <span
                                    style={{ backgroundColor: color.color }}
                                    className="mr-2 size-4 rounded-sm bg-white"
                                  />
                                  {color.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <label className="mb-1 block items-center text-xs font-bold uppercase text-[#6F6F6F]">
                        Background
                      </label>
                      <Select
                        value={selectedBackgroundColor}
                        onValueChange={setSelectedBackgroundColor}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {backgroundColors.map((color) => (
                              <SelectItem key={color.color} value={color.name}>
                                <span className="flex items-center">
                                  <span
                                    style={{ backgroundColor: color.color }}
                                    className="mr-2 size-4 rounded-sm bg-white"
                                  />
                                  {color.name}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {/* Additional Options Section */}
                  <div className="mb-1">
                    <div className="mt-1">
                      <div className="mb-1">
                        <label
                          htmlFor="additional-info"
                          className="mb-2 flex items-center text-xs font-bold uppercase text-[#6F6F6F]"
                        >
                          Additional Info
                          <InfoTooltip content="Provide any additional information about your logo" />
                        </label>
                        <Textarea
                          value={additionalInfo}
                          onChange={(e) => setAdditionalInfo(e.target.value)}
                          placeholder="Enter additional information"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-8 py-4 md:px-6 md:py-6">
                <Button
                  size="lg"
                  className="w-full text-base font-bold"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loader mr-2" />
                  ) : (
                    <Image
                      src="/generate-icon.svg"
                      alt="Generate Icon"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                  )}
                  {isLoading ? "Loading..." : "Generate Logo"}{" "}
                </Button>
              </div>
            </fieldset>
          </form>

          {isLoaded && !isSignedIn && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 px-6"
            >
              <div className="rounded bg-gray-200 p-4 text-gray-900">
                <p className="text-lg">
                  Create a free account to start making logos:
                </p>

                <div className="mt-4">
                  <SignInButton
                    mode="modal"
                    signUpForceRedirectUrl={domain}
                    forceRedirectUrl={domain}
                  >
                    <Button
                      size="lg"
                      className="w-full text-base font-semibold"
                      variant="secondary"
                    >
                      Sign in
                    </Button>
                  </SignInButton>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex w-full flex-col pt-12 md:pt-0">
          <Header className="hidden md:block" />{" "}
          {/* Show header on larger screens */}
          <div className="relative flex flex-grow items-center justify-center px-4">
            <div className="relative aspect-square w-full max-w-lg">
              {generatedImage ? (
                <>
                  <Image
                    className={`${isLoading ? "animate-pulse" : ""}`}
                    width={512}
                    height={512}
                    src={generatedImage}
                    alt=""
                  />
                  <div
                    className={`pointer-events-none absolute inset-0 transition ${isLoading ? "bg-black/50 duration-500" : "bg-black/0 duration-0"}`}
                  />

                  <div className="absolute -right-12 top-0 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" asChild>
                      <a href={generatedImage} download="logo.png">
                        <DownloadIcon />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      onClick={generateLogo}
                      variant="secondary"
                    >
                      <Spinner loading={isLoading}>
                        <RefreshCwIcon />
                      </Spinner>
                    </Button>
                  </div>
                </>
              ) : (
                <Spinner loading={isLoading} className="size-8 text-white">
                  <div className="flex aspect-square w-full flex-col items-center justify-center rounded-xl bg-[#2C2C2C]">
                    <h4 className="text-center text-base leading-tight text-white">
                      Generate your dream
                      <br />
                      logo in 10 seconds!
                    </h4>
                  </div>
                </Spinner>
              )}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
