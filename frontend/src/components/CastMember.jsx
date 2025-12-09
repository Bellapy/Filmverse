const CastMember = ({ person }) => {
  const placeholder = 'https://via.placeholder.com/150x225?text=Sem+Foto';
  const profileUrl = person.profile_path 
    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
    : placeholder;

  return (
    <div className="flex-shrink-0 w-28 text-center">
      <img 
        src={profileUrl}
        alt={person.name}
        className="w-20 h-20 mx-auto rounded-full object-cover border-2 border-gray-700 shadow-md"
      />
      <p className="text-white text-sm font-bold mt-2 truncate">{person.name}</p>
      <p className="text-gray-400 text-xs truncate">{person.character}</p>
    </div>
  );
};

export default CastMember;