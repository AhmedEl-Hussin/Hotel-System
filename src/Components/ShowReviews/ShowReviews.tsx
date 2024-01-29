import reviewImg from '../../assets/reviewImg.png'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import StarIcon from '@mui/icons-material/Star';

export default function ShowReviews(props) {
    

    return (
        <>
         <div className='homeReviewContainer'>
            <div className="reviewImgContainer">
           <img src={reviewImg} alt="review" className='reviewImg' />
            </div>
            <div className="reviewDetails">
                <div style={{color:'#152C5B' ,padding:'50px', fontFamily:'Poppins'}}>
                 <h4 style={{fontSize:'20px',fontWeight:'normal', marginBottom:'20px'}}>Happy Family</h4>
                 <div style={{color:'#FFCC47'}}>
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                    <StarIcon />
                 </div>
                 <p style={{fontSize:'28px'}}>What a great trip with my family and I should try again next time soon ...</p>
                 <span style={{color:'#B0B0B0'}}>Angga, Product Designer</span>
                 <div style={{marginTop:"30px",color:'#203FC7'}}>
                    <span style={{marginRight:'20px'}}>
                    <ArrowCircleLeftOutlinedIcon sx={{fontSize:'40px'}}/>
                    </span>
                  <span style={{marginLeft:'20px'}}>
                  <ArrowCircleRightOutlinedIcon sx={{fontSize:'40px'}} />
                  </span>
                   
                 </div>
                </div>

            </div>


            </div>
            
        </>
    )
}
