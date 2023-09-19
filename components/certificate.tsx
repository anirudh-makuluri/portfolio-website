"use client"

import React, { useRef } from 'react';
import { certificatesData } from '@/lib/data';
import { motion, useScroll, useTransform } from "framer-motion";
import Link from 'next/link';
import Image from 'next/image';



type CertificateProps = (typeof certificatesData)[number]

export default function Certificate({
    name,
    issuedBy,
    date,
    link,
    badge,
    description
}: CertificateProps) {

    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1.33 1"]
    });
    const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

    return (
        <motion.div
            ref={ref}
            style={{
                scale: scaleProgess,
                opacity: opacityProgess
            }}
            className='group mb-3 sm:mb-8 last:mb-0'
        >
            <Link href={link} target='_blank'>
                <section className="bg-gray-100 flex flex-row justify-between gap-4 max-w-[45rem] border border-black/5 rounded-lg overflow-hidden sm:pr-8 relative sm:h-[20rem] hover:bg-gray-200 transition sm:pl-8 dark:text-white dark:bg-white/10 dark:hover:bg-white/20">
                    <div className='flex items-center justify-center'>
                        <Image
                            src={badge}
                            alt={name}
                            quality={95}
                            width={150}
                            height={150}
                            className="hidden sm:block rounded-lg shadow-2xl"
                        />

                    </div>
                    <div className="pt-4 pb-7 px-5 sm:pl-10 sm:pr-2 sm:pt-10 sm:max-w-[70%] flex flex-col h-full ">
                        <h3 className="text-2xl font-semibold text-center sm:text-left">{name}</h3>
                        <h5 className='text-lg font-medium text-gray-700 dark:text-white/70 text-center sm:text-left'>{issuedBy}</h5>
                        <h6 className='text-sm font-medium text-gray-700 dark:text-white/70 text-center sm:text-left'>{date}</h6>
                        <p className="mt-2 leading-relaxed text-gray-700 dark:text-white/70">
                            {description}
                        </p>
                    </div>
                </section>
            </Link>

        </motion.div>
    )
}
