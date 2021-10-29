import React from 'react'
import './CSS/content.css'
import {Link} from 'react-scroll'

function Content() {

    const [moveContainer, setMoveContainer] = React.useState(false)
    const [swipeDirection, setSwipeDirection] = React.useState("")
    const [correctSwipeDirection, setCorrectSwipeDirection] = React.useState("left")

    React.useEffect(() => {
        setCorrectSwipeDirection("left")

        let touchstartX = 0
        let touchendX = 0
    
        const slider = document.getElementById('slider')
    
    function handleGesture() {
      if (touchendX < touchstartX) setSwipeDirection("right")
      if (touchendX > touchstartX) setSwipeDirection("left")
    }
    
    slider.addEventListener('touchstart', e => {
      touchstartX = e.changedTouches[0].screenX
    })
    
    slider.addEventListener('touchend', e => {
      touchendX = e.changedTouches[0].screenX
      handleGesture()
    })
    }, [])

    React.useEffect(() => {
        if(swipeDirection === correctSwipeDirection) {
            if(correctSwipeDirection === "right") {
                setMoveContainer(false)
                setCorrectSwipeDirection("left")
            }
            else {
                setMoveContainer(true)
                setCorrectSwipeDirection("right")
            }

        }
    }, [swipeDirection])


    
    return (
        <div className={(moveContainer ? "move-content-container" : "") + " content-container"} id="slider">

            <div className={"arrow-left" + " arrow"}>
                <a onClick={() => setMoveContainer(false)} href="#">{"<"}</a>
            </div>

            <div className={"personal-story"}>
                <div className={"story-text"}>
                    <p className={"story-1"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut lectus sagittis, sodales est at, molestie erat.  Sed sollicitudin suscipit facilisis.</p>
                    <p className={"story-2"}>Cras vehicula, mi vitae viverra dapibus, libero est viverra dui, nec vestibulum arcu enim nec ante. Pellentesque ultricies risus a volutpat dignissim.</p>
                    <p className={"story-3"}>Praesent interdum, odio placerat fringilla congue, ex mi auctor elit, vitae tincidunt ligula quam eu neque. Proin eu nisl lacus.</p> 
                </div>
            </div>

            <div className={"personal-relative"}>
            <div className={"personal-information"}>
                <div className={"name"}>
                    <h1 className={"name-h1"}>Gabriel Raskov</h1>
                </div>

                <div className={"date"}>
                    <h3 className={"name-h3"}>05.01.28</h3>
                </div>
            </div>
            </div>

            <div className={"arrow-right" + " arrow"}>
                <a onClick={() => setMoveContainer(true)} href="#">{">"}</a>
            </div>

            <div className={"about-me"}>

            </div>

            <div className="arrow-down arrow">
                <Link to="about-me-container" offset={-100} smooth={true} duration={1000}><a href="">↓</a></Link>
            </div>
        </div>
    )
}

export default Content