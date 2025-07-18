import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import TermsPolicyBody from '@/components/shared/TermsPolicyBody'

export const metadata = {
  title: 'Terms & Conditions',
}
// const termsData = getMarkDownData('data/policy')

const FAQPage = () => {
  return (
    <LayoutOne>
      <PageHero title="Terms & " italicTitle="Privacy" badgeTitle="Terms" scale />
      <TermsPolicyBody />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: '1', img: '/images/agent/18.webp' },
            { id: '2', img: '/images/agent/16.webp' },
            { id: '3', img: '/images/agent/19.webp' },
          ]}
        />
        with us.
        <i className="block font-instrument italic text-[#F54BB4] max-md:inline-block max-sm:pl-2 sm:mt-10">
          A virtual coffee?
        </i>
      </CTA>
    </LayoutOne>
  )
}

export default FAQPage
