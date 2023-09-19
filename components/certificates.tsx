"use client"

import { useSectionInView } from '@/lib/hooks'
import React from 'react'
import SectionHeading from "./section-heading";
import { certificatesData } from '@/lib/data';
import Certificate from './certificate';

export default function Certificates() {
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
