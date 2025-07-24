import os
import markdown
import frontmatter
import codecs
from pathlib import Path

# Configuration
SOURCE_DIR = 'blog_source'
OUTPUT_DIR = 'blog'
TEMPLATE_FILE = 'blog_template.html'
BLOG_INDEX_FILE = os.path.join(OUTPUT_DIR, 'index.html')
BASE_URL = 'https://start.shadowpages.io/blog/' # Base URL for blog articles

def generate_html(md_file_path, template_content):
    """Generates an HTML file from a Markdown file using a template."""
    try:
        with codecs.open(md_file_path, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)

        md_content = post.content
        html_content = markdown.markdown(md_content, extensions=['extra', 'codehilite'])

        # --- Metadata --- 
        title = post.metadata.get('title', 'Untitled Post')
        # Use filename as slug if not provided
        slug = post.metadata.get('slug', Path(md_file_path).stem)
        # Canonical URL for Medium (optional)
        medium_canonical_url = post.metadata.get('medium_canonical_url', None)

        # --- Generate Canonical Link Tag --- 
        # Priority: Medium URL if provided, otherwise self
        canonical_url = medium_canonical_url if medium_canonical_url else f"{BASE_URL}{slug}.html"
        canonical_link_tag = f'<link rel="canonical" href="{canonical_url}" />' if canonical_url else ''

        # --- Fill Template --- 
        final_html = template_content.replace('{title}', title)
        final_html = final_html.replace('{content}', html_content)
        final_html = final_html.replace('{canonical_link_tag}', canonical_link_tag)

        # --- Save HTML File --- 
        output_file_path = os.path.join(OUTPUT_DIR, f"{slug}.html")
        os.makedirs(os.path.dirname(output_file_path), exist_ok=True)
        with codecs.open(output_file_path, 'w', encoding='utf-8') as f:
            f.write(final_html)
        print(f"Generated: {output_file_path} (Canonical: {canonical_url})")
        return {'title': title, 'url': f"{slug}.html"}

    except Exception as e:
        print(f"Error processing {md_file_path}: {e}")
        return None

def generate_blog_index(articles, template_content):
    """Generates an index page listing all blog articles."""
    if not articles:
        return

    list_items = ""
    for article in sorted(articles, key=lambda x: x['title']): # Sort alphabetically for consistency
        list_items += f'<li><a href="{article["url"]}">{article["title"]}</a></li>\n'

    index_content = f""" 
    <h1>Blog Index</h1>
    <ul>
        {list_items}
    </ul>
    """

    # Use the main template for the index page as well
    index_html = template_content.replace('{title}', 'Blog Index')
    index_html = index_html.replace('{content}', index_content)
    # Index page should self-canonicalize or have none
    index_canonical_tag = f'<link rel="canonical" href="{BASE_URL}index.html" />'
    index_html = index_html.replace('{canonical_link_tag}', index_canonical_tag)

    with codecs.open(BLOG_INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(index_html)
    print(f"Generated: {BLOG_INDEX_FILE}")


if __name__ == '__main__':
    # Ensure output directory exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Read template
    try:
        with codecs.open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
            template = f.read()
    except FileNotFoundError:
        print(f"Error: Template file '{TEMPLATE_FILE}' not found.")
        exit(1)

    generated_articles = []
    # Process each Markdown file
    for filename in os.listdir(SOURCE_DIR):
        if filename.endswith('.md'):
            filepath = os.path.join(SOURCE_DIR, filename)
            article_data = generate_html(filepath, template)
            if article_data:
                generated_articles.append(article_data)

    # Generate index page
    generate_blog_index(generated_articles, template)

    print("\nBlog generation complete.")

