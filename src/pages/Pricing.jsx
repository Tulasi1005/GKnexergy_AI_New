import React from "react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import CTABand from "../components/CTABand";
import PricingPlans from "../components/PricingPlans/PricingPlans";

const Pricing = () => {
    return (
        <>
            <SEO
                title="Pricing Plans & Engagement Models | GK Nexergy"
                description="Transparent pricing plans for enterprise technology solutions, agile pods, software development, and AI transformation. Choose Starter, Growth, or Premium."
            />
            <PageHero
                eyebrow="Pricing & Engagement Models"
                titleLines={["Transparent Pricing.", "Zero Surprises."]}
                description="Choose between Starter, Growth, or Premium engagement models. 100% IP ownership, dedicated engineering pods, and sprint-based delivery."
                testId="pricing-hero"
            />

            <PricingPlans showHeader={false} showComparison={true} showFaqs={true} />

            <CTABand
                title="Need a Custom Scope or Enterprise SLA?"
                text="Schedule a free 30-minute discovery session with our lead architects to structure a custom engagement plan tailored to your roadmap."
                primary={{ label: "Schedule Discovery Call", to: "/contact" }}
                secondary={{ label: "Explore Solutions", to: "/solutions" }}
            />
        </>
    );
};

export default Pricing;
