import styled from '@emotion/styled';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Content } from '../components/Content';
import { FavoriteButton } from '../components/FavoriteButton';
import { SwapPaginatedList } from '../components/SwapPaginatedList';
import { SwCharacter } from '../types/SwCharacter';
import { id } from '../util/id';

const Container = styled.li`
  list-style: none;
  width: 20em;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 0.5rem;
  gap: 2rem;
  transition: background-color 0.2s;

  :hover {
    background-color: rgba(0 0 0 / 0.2);
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  gap: 2rem;
`;

const SearchTitle = styled.dt`
  text-align: left;
  font-weight: bold;
`;

const Search = styled.input`
  text-align: left;
  width: 70%;
  height: 25px;
`;

export function Home() {
  const [search, setSearch] = useState('');

  return (
    <>
      <Content as="h1">Cytora test app</Content>
      <SearchBar>
        <SearchTitle>Search Characters:</SearchTitle>
        <Search
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Please input search word"
            value={search}
        />
      </SearchBar>
      <SwapPaginatedList apiPath="/people" search={search}>
        {(character: SwCharacter) => (
          <Container key={character.url}>
            <Link to={`/character/${id(character)}`}>
              <Header>
                <FavoriteButton item={character} />
                <h4>{character.name}</h4>
              </Header>
            </Link>
          </Container>
        )}
      </SwapPaginatedList>
    </>
  );
}
