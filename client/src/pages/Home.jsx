import React, { useEffect, useState } from "react";
import { Card, Loader, FormField } from "../components";

const RenderCard = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
      );
  }
  return (
    <h2 className="mt-5 font-bold text-[#df763a] text-xl uppercase">{title}</h2>
    );
  };
  
  const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPost] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);
  
  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("DATA FETCHED");
        setAllPost(result.data.reverse());
        console.log('DATA SETED');
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResult);
      }, 500),
    );
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-3 text-[#666e75] max-w-[500px] text-[16px]">
          {" "}
          Browse Through The Imaginative And Visually Stunning Images
        </p>
      </div>
      <div className="mt-16">
        <FormField labelName={'Search Post'} type={'text'} name={'text'} placeholder={"Search Post"} value={searchText} handleChange={handleSearchChange} />
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Result For{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCard data={searchedResults} title={"NO Search Result Found"} />
              ) : (
                <RenderCard data={allPosts} title={"NO Post Found"} />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
