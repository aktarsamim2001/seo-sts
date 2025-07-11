import BlogPostV5 from '@/components/blogpage/BlogPostV5'
import CTA from '@/components/shared/CTA'
import CtaImageSlider from '@/components/shared/CtaImageSlider'
import LayoutOne from '@/components/shared/LayoutOne'
import PageHero from '@/components/shared/PageHero'
import getMarkDownData from '@/utils/GetMarkDownData'
import { aiDrivenPersonalizationInMarketing } from '@/data/blogsV2/ai-driven-personalization-in-marketing'

const allBlogs = aiDrivenPersonalizationInMarketing.map((blog, idx) => ({
  ...blog,
  _uniqueKey: `blog-${idx}`,
}))

const BlogPage = () => {
  return (
    <LayoutOne>
      <PageHero
        badgeTitle="Blog"
        title="What we got to say"
        italicTitle=""
        description="These alternatives can add a different tone or emphasis depending on how you want  to introduce your creative team. Let me know if you'd like any specific adjustments!"
      />
      <BlogPostV5 Blogs={allBlogs} />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: '1', img: '/images/agent/11.webp' },
            { id: '2', img: '/images/agent/09.webp' },
            { id: '3', img: '/images/agent/17.webp' },
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

export default BlogPage
