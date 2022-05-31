const PresentoireForm = () => {
  const handleSubmit = (e: any) => {
    const data = new FormData(e.target);
    localStorage.setItem(
      "id-presentoire",
      JSON.stringify(data.get("id-presentoire"))
    );
  };

  return (
    <form id="presentoire-form" onSubmit={handleSubmit}>
      <label>
        Id du présentoire :
        <input type="number" name="id-presentoire" />
      </label>
      <input type="submit" value="Valider" />
    </form>
  );
};

export default PresentoireForm;
