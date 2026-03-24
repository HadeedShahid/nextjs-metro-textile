import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState
} from 'react'
import { EmblaCarouselType } from 'embla-carousel'

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
}

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  }
}

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PropType = React.ComponentPropsWithRef<typeof Button>

export const PrevButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props
  if (disabled) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full shadow-lg border-slate-100 hover:bg-slate-50 transition-all bg-white text-slate-700 h-10 w-10 flex items-center justify-center p-0"
      type="button"
      {...restProps}
    >
      <ChevronLeft className="w-5 h-5" />
      {children}
    </Button>
  )
}

export const NextButton = (props: PropType) => {
  const { children, disabled, ...restProps } = props
  if (disabled) return null

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full shadow-lg border-slate-100 hover:bg-slate-50 transition-all bg-white text-slate-700 h-10 w-10 flex items-center justify-center p-0"
      type="button"
      {...restProps}
    >
      <ChevronRight className="w-5 h-5" />
      {children}
    </Button>
  )
}
