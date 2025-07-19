// src/components/shared/TermsPolicyBody.tsx
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeSlug from 'rehype-slug'
import RevealWrapper from '../animation/RevealWrapper'

interface PropsTypes {
  termsData: any
  heading?: boolean
}

const TermsPolicyBody: FC<PropsTypes> = ({ termsData, heading = false }) => {
  return (
    <section className="relative overflow-hidden pb-14 md:pb-16 lg:pb-[88px] xl:pb-[100px]">
      <div className="container">
        {heading && (
          <RevealWrapper>
            <h2 className="mb-5 text-xl sm:text-[25px] md:mb-10 md:text-4xl md:leading-[1.5]">
              {termsData[0]?.content || 'Default heading content'}
            </h2>
          </RevealWrapper>
        )}

        {/* <div className="blog-details-body">
          {termsData.map((terms:any, index) => (
            <RevealWrapper key={index}>
              <ReactMarkdown rehypePlugins={[[rehypeSlug]]}>{terms.content}</ReactMarkdown>
            </RevealWrapper>
          ))}
        </div> */}
      </div>
    </section>
  )
}

export default TermsPolicyBody
