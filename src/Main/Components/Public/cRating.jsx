import React,{Component} from 'react'
import './style/sRating.css'

class CRating extends Component{
    constructor(props) {
        super(props)

        this.state = {
            rank: '0'
        }
    }

    changeStarsRatingHandler = e => {
        const newRank = e.target.value
        this.setState({ rank: newRank })
    }

    render() {
        const { rank } = this.state,
            amount = 5
        let stars = [],
            style

        for (let i = amount; i > 0; i--) {
            if (i < rank) {
                style = 'rating star gold checkedStar'
            } else if (i == rank) {
                // style = 'rating star gold checkedStar checkedLastStar'
                style = 'rating star gold checkedStar'
            } else {
                style = 'rating star'
            }

            stars.push(
                <label key={i} className={style} onChange={e => this.changeStarsRatingHandler(e)} >
                    <input type="radio" name="rating" value={i} />
                </label>
            )
        }

        return <div className="rating stars">{stars}</div>
    }
}

export default CRating;