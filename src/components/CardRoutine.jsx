function CardRoutine(props) {
  return (
    <article>
      <h3>{props.nama}</h3>
      <p>Fokus latihan: {props.fokus}</p>
    </article>
  );
}

export default CardRoutine;