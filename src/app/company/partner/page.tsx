import PartnerPage from "../../../components/_level_2/partnerPage";

export const metadata = {
  title: "TicTask Partner Program — Build, Integrate, and Grow",
  description:
    "Join the TicTask Partner Program. Build integrations, grow your network, and collaborate with us to deliver more value to teams worldwide.",
  openGraph: {
    title: "TicTask Partner Program — Build, Integrate, and Grow",
    description:
      "Partner with TicTask to access APIs, co-marketing, and developer tools that scale with your business.",
    url: "https://tictask.com/company/partner",
    siteName: "TicTask",
    images: [
      {
        url: "https://tictask.com/og/partner.png",
        width: 1200,
        height: 630,
        alt: "TicTask Partner Program",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicTask Partner Program — Build, Integrate, and Grow",
    description:
      "Integrate with TicTask, collaborate with our team, and grow your business with us.",
    images: ["https://tictask.com/og/partner.png"],
  },
};

export default function Page() {
  return (
    <main>
      <PartnerPage />
    </main>
  );
}
