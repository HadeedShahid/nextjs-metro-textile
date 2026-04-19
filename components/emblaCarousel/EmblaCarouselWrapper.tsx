"use client"
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import {
    NextButton,
    PrevButton,
    usePrevNextButtons
} from './emblaCarouselArrowButtons'
import { DotButton, useDotButton } from './emblaCarouselDotButton'

import { cn } from "@/lib/utils"

type PropType = {
    children: React.ReactNode
    options?: EmblaOptionsType
    className?: string
    containerClassName?: string
    slideClassName?: string
}

const EmblaCarouselWrapper = (props: PropType) => {
    const { children, options, className, containerClassName, slideClassName } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(options)

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi)

    return (
        <div className="w-full">
            <div className="relative w-full">
                <div className={cn("overflow-hidden -my-4 py-4", className)} ref={emblaRef}>
                    <div className={cn("flex touch-pan-y touch-pinch-zoom", containerClassName)}>
                        {React.Children.map(children, (child, index) => (
                            <div className={cn("flex-[0_0_100%] min-w-0 select-none py-1 pl-px", slideClassName)} key={index}>
                                {child}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2 z-10 hidden md:block">
                    <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                </div>

                <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 z-10 hidden md:block">
                    <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
            </div>

            <div className="flex justify-center items-center mt-6">
                <div className="flex flex-wrap justify-center items-center gap-2">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                index === selectedIndex
                                    ? "bg-primary w-6"
                                    : "bg-slate-300 hover:bg-slate-400"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EmblaCarouselWrapper
