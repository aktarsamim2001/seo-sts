import Marquee from 'react-fast-marquee'
import RevealWrapper from '../animation/RevealWrapper'

interface MovingText {
  title: string
  color: string
}

interface ClientsV3Props {
  moveText?: MovingText[]
}

const ClientsV3 = ({ moveText }: ClientsV3Props) => {
  const safeMoveText = Array.isArray(moveText) ? moveText : []
  return (
    <section className="overflow-hidden pb-14 md:pb-16 md:pt-8 lg:pb-[68px] lg:pt-[78px] xl:pb-[80px] xl:pt-[90px]">
      <RevealWrapper>
        <Marquee pauseOnHover>
          <div className="flex items-center justify-between py-2.5 pb-5">
            {safeMoveText.map((item, idx) => (
              <div className="mr-5 flex items-center gap-6" key={`moving-text-${idx}`}>
                <span
                  className="text-nowrap text-5xl font-medium leading-tight tracking-[-2px] sm:text-[55px] md:text-[67px] lg:text-[84px] xl:text-8xl xl:leading-[1.1] xl:tracking-[-2.88px]"
                  style={{ color: item.color }}>
                  {item.title}
                </span>
                <span className="mt-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M20.002 0C20.002 0 19.789 11.2169 24.2871 15.7149C28.785 20.2129 40.002 20 40.002 20C40.002 20 28.785 19.7871 24.2871 24.2851C19.789 28.7831 20.002 40 20.002 40C20.002 40 20.2149 28.7831 15.7168 24.2851C11.2189 19.7871 0.00195312 20 0.00195312 20C0.00195312 20 11.2189 20.2129 15.7168 15.7149C20.2149 11.2169 20.002 0 20.002 0Z"
                      style={{ fill: item.color }}
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </Marquee>
      </RevealWrapper>
      <RevealWrapper>
        <Marquee direction="right" pauseOnHover>
          <div className="flex items-center justify-between py-2.5 pb-5">
            {safeMoveText.map((item, idx) => (
              <div className="mr-5 flex items-center gap-6" key={`moving-text-${idx}`}>
                <span
                  className="text-nowrap text-5xl font-medium leading-tight tracking-[-2px] sm:text-[55px] md:text-[67px] lg:text-[84px] xl:text-8xl xl:leading-[1.1] xl:tracking-[-2.88px]"
                  style={{ color: item.color }}>
                  {item.title}
                </span>
                <span className="mt-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path
                      d="M20.002 0C20.002 0 19.789 11.2169 24.2871 15.7149C28.785 20.2129 40.002 20 40.002 20C40.002 20 28.785 19.7871 24.2871 24.2851C19.789 28.7831 20.002 40 20.002 40C20.002 40 20.2149 28.7831 15.7168 24.2851C11.2189 19.7871 0.00195312 20 0.00195312 20C0.00195312 20 11.2189 20.2129 15.7168 15.7149C20.2149 11.2169 20.002 0 20.002 0Z"
                      style={{ fill: item.color }}
                    />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </Marquee>
      </RevealWrapper>
    </section>
  )
}

export default ClientsV3
