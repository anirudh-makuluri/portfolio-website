"use client"

import { useSectionInView } from '@/lib/hooks'
import React from 'react'
import SectionHeading from "./section-heading";
import { certificatesData } from '@/lib/data';
import Certificate from './certificate';
import { useViewMode } from "@/context/view-mode-context";
import CertificatesRPG from "./rpg/certificates-rpg";

export default function Certificates() {
    const { viewMode } = useViewMode();
    if (viewMode === "rpg") return <CertificatesRPG />;
    return <CertificatesSimple />;
}

function CertificatesSimple() {
    const { ref } = useSectionInView("Certificates");

    return (
        <section id='certificates' ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
            <SectionHeading>Certificates</SectionHeading>
            <div>
                {
                    certificatesData.map((certificate, index) => (
                        <React.Fragment key={index}>
                           <Certificate {...certificate}/>
                        </React.Fragment>
                    ))
                }
            </div>
        </section>
    )
}
