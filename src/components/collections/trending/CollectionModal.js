import 'styles/collections/collectionModal.scss';
import { ReactComponent as CloseIcon } from 'assets/images/cancel.svg';
import { ReactComponent as EtherIcon } from 'assets/images/openSeaNoBackground.svg';
// import { ReactComponent as CloseIcon } from 'assets/images/cancel.svg';

const CollectionModal = ({ data, callBack }) => {
  return (
    <div className="collection__modal_container">
      <div className="collection__modal">
        <div className="modal__closer">
          <CloseIcon onClick={callBack} />
        </div>

        <div className="collection__modal_body">
          <div className="collection__modal_body_user">
            <div className="user__name_id">
              <h2>{data.type}</h2>
              <span>#{data.id}</span>
            </div>

            <div className="user__image">
              <img src={data.token_image} alt="token_image" />
            </div>

            <div className="user__rank">
              <h2>Rank:</h2>
              <span>#{data.id}</span>

              <EtherIcon />
            </div>
          </div>

          <div className="collection__modal_body_offer">
            <div>
              <EtherIcon />

              <button>Buy</button>
              <button>Offer</button>
            </div>

            <div>
              <EtherIcon />

              <span>NOT LISTED</span>
            </div>
          </div>
        </div>

        <div className="collection__modal_side">
          <div className="collection__modal_side_item">
            <div>
              <h3>CLOTHES</h3>
              <span>2.5%</span>
            </div>

            <div>
              <h2>Hoodie black</h2>
              <p>0.3</p>
            </div>
          </div>

          <div className="collection__modal_side_item">
            <div>
              <h3>CLOTHES</h3>
              <span>2.5%</span>
            </div>

            <div>
              <h2>Hoodie black</h2>
              <p>0.3</p>
            </div>
          </div>

          <div className="collection__modal_side_item">
            <div>
              <h3>CLOTHES</h3>
              <span>2.5%</span>
            </div>

            <div>
              <h2>Hoodie black</h2>
              <p>0.3</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionModal;
