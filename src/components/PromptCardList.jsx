import PromptCard from "./PromptCard"

const PromptCardList = ({data, handleEdit, handleDelete, handleTagClick}) => {
    return (
      <div className='mt-10 prompt_layout'>
        {data && data?.map((item) => 
          <PromptCard
            item={item}
            key={item?._id}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleTagClick={handleTagClick}
          />
        )}
      </div>
    )
}

export default PromptCardList