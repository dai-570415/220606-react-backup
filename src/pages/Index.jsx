import Layout from '../components/Layout/Layout';
import { ArticleList } from '../components/ArticleList/ArticleList';
// import { Theme } from '../components/Theme/Theme';
// import { Upload } from '../components/Upload/Upload';
// import { Dictaphone } from '../components/Dictaphone/Dictaphone';
// import { Voice } from '../components/Voice/Voice';
// import { User } from '../components/User/User';

const Index = () => {
    return (
        <Layout>
            <main className="top">
                {/* <Upload /> */}
                {/* <Theme /> */}
                <ArticleList />
                {/* <Dictaphone /> */}
                {/* <Voice /> */}
                {/* <User /> */}
            </main>
        </Layout>
    );
}

export default Index;
